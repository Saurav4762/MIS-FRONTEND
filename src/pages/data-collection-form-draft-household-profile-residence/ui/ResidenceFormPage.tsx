import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useForm, useWatch } from "react-hook-form";
import { Home } from "lucide-react";
import { Button } from "@shared/ui/Button";
import { FormField, Input, Select, Textarea } from "@shared/ui/Input";
import {
	FLOOR_MATERIAL_OPTIONS,
	HOUSING_TYPE_OPTIONS,
	OWNERSHIP_STATUS_OPTIONS,
	RESIDENCE_FORM_DEFAULT_VALUES,
	ROOF_MATERIAL_OPTIONS,
	TOILET_FACILITY_OPTIONS,
	WATER_SOURCE_OPTIONS,
	YES_NO_OPTIONS,
	type ResidenceFormValues,
	loadResidenceDraft,
	saveResidenceDraft,
	createResidenceNodeId,
} from "../model";

const AUTOSAVE_DELAY_MS = 350;

export default function ResidenceFormPage() {
	const navigate = useNavigate();
	const { surveyId, householdId } = useParams({
		from: "/_app/data-collection/forms/drafts/$surveyId/household-profile/$householdId/residence",
	});
	const nodeId = useMemo(() => createResidenceNodeId(householdId), [householdId]);
	const [isHydrated, setIsHydrated] = useState(false);
	const [isSaving, setIsSaving] = useState(false);

	const { register, reset, control, handleSubmit } = useForm<ResidenceFormValues>({
		defaultValues: RESIDENCE_FORM_DEFAULT_VALUES,
		mode: "onChange",
	});

	useEffect(() => {
		let isCancelled = false;

		void (async () => {
			const values = await loadResidenceDraft(surveyId, householdId);
			if (isCancelled) return;

			reset(values);
			setIsHydrated(true);
		})();

		return () => {
			isCancelled = true;
		};
	}, [householdId, reset, surveyId]);

	const watchedValues = useWatch({ control });
	const autosaveValues = useMemo(
		() => ({
			...RESIDENCE_FORM_DEFAULT_VALUES,
			...watchedValues,
		}) satisfies ResidenceFormValues,
		[watchedValues],
	);

	useEffect(() => {
		if (!isHydrated) return;

		const timeoutId = window.setTimeout(() => {
			setIsSaving(true);
			void saveResidenceDraft(surveyId, householdId, autosaveValues).finally(() => {
				setIsSaving(false);
			});
		}, AUTOSAVE_DELAY_MS);

		return () => window.clearTimeout(timeoutId);
	}, [autosaveValues, householdId, isHydrated, surveyId]);

	const goPrevious = () => {
		navigate({
			to: "/data-collection/forms/drafts/$surveyId/household-profile/$householdId/social-cultural",
			params: { surveyId, householdId },
		});
	};

	const goNext = async (values: ResidenceFormValues) => {
		setIsSaving(true);
		await saveResidenceDraft(surveyId, householdId, values);
		setIsSaving(false);
		navigate({
			to: "/data-collection/forms/drafts/$surveyId/household-profile/$householdId/economic",
			params: { surveyId, householdId },
		});
	};

	return (
		<section className="flex h-full flex-col overflow-hidden rounded-xl border border-ink-200 bg-white shadow-sm">
			<header className="flex shrink-0 items-center gap-4 border-b border-ink-200 px-5 py-4">
				<div className="grid h-10 w-10 place-items-center rounded-lg bg-pri-50 text-pri-600">
					<Home className="h-5 w-5" />
				</div>
				<div className="min-w-0">
					<h1 className="truncate text-lg font-bold leading-6 text-ink-900">
						Residence
					</h1>
					<p className="mt-0.5 text-sm font-bold uppercase tracking-wide text-ink-400">
						आवास विवरण
					</p>
				</div>
				<div className="ml-auto rounded-full border border-ink-200 bg-ink-50 px-3 py-1 text-xs font-semibold text-ink-500">
					{isSaving ? "Saving locally..." : "Saved locally"}
				</div>
			</header>

			<div className="flex min-h-0 flex-1 flex-col">
				<form
					className="custom-scrollbar flex-1 overflow-y-auto px-6 py-6 md:px-8 md:py-7"
					onSubmit={handleSubmit(goNext)}
				>
					<div className="mx-auto max-w-4xl space-y-8">
						<section className="rounded-lg border border-ink-200 bg-ink-50/70 p-5">
							<div className="mb-4">
								<h2 className="text-sm font-bold uppercase tracking-[0.12em] text-ink-500">
									Draft Node
								</h2>
								<p className="text-sm text-ink-600">
									Node ID: <span className="font-mono text-ink-800">{nodeId}</span>
								</p>
							</div>

							<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
								<FormField label="Ownership Status" as="div">
									<Select
										{...register("ownershipStatus")}
										placeholder="Select ownership"
										options={OWNERSHIP_STATUS_OPTIONS}
									/>
								</FormField>

								<FormField label="Housing Type" as="div">
									<Select
										{...register("housingType")}
										placeholder="Select housing type"
										options={HOUSING_TYPE_OPTIONS}
									/>
								</FormField>

								<FormField label="Roof Material" as="div">
									<Select
										{...register("roofMaterial")}
										placeholder="Select roof material"
										options={ROOF_MATERIAL_OPTIONS}
									/>
								</FormField>

								<FormField label="Floor Material" as="div">
									<Select
										{...register("floorMaterial")}
										placeholder="Select floor material"
										options={FLOOR_MATERIAL_OPTIONS}
									/>
								</FormField>

								<FormField label="Water Source" as="div">
									<Select
										{...register("waterSource")}
										placeholder="Select water source"
										options={WATER_SOURCE_OPTIONS}
									/>
								</FormField>

								<FormField label="Toilet Facility" as="div">
									<Select
										{...register("toiletFacility")}
										placeholder="Select toilet facility"
										options={TOILET_FACILITY_OPTIONS}
									/>
								</FormField>

								<FormField label="Electricity Access" as="div">
									<Select
										{...register("electricityAccess")}
										placeholder="Select yes or no"
										options={YES_NO_OPTIONS}
									/>
								</FormField>

								<FormField label="Internet Access" as="div">
									<Select
										{...register("internetAccess")}
										placeholder="Select yes or no"
										options={YES_NO_OPTIONS}
									/>
								</FormField>

								<FormField label="Room Count" as="div">
									<Input
										{...register("roomCount")}
										type="number"
										min={0}
										placeholder="Enter room count"
									/>
								</FormField>
							</div>

							<div className="mt-5">
								<FormField label="Remarks" as="div">
									<Textarea
										{...register("remarks")}
										placeholder="Add any residence notes"
									/>
								</FormField>
							</div>
						</section>

						<section className="rounded-lg border border-ink-200 bg-white p-5">
							<div className="flex items-center justify-between gap-4">
								<div>
									<h2 className="text-sm font-bold uppercase tracking-[0.12em] text-ink-500">
										Autosave
									</h2>
									<p className="text-sm text-ink-600">
										Values are stored per node in IndexedDB and loaded lazily.
									</p>
								</div>
								<Button type="submit" variant="primary">
									Save and continue
								</Button>
							</div>
						</section>
					</div>
				</form>

				<footer className="flex shrink-0 items-center justify-between gap-3 border-t border-ink-200 bg-ink-50 px-6 py-4 md:px-8">
					<Button variant="secondary" onClick={goPrevious}>
						Previous
					</Button>
					<p className="text-xs font-medium text-ink-500">
						Drafts are stored locally by survey and node id.
					</p>
				</footer>
			</div>
		</section>
	);
}
