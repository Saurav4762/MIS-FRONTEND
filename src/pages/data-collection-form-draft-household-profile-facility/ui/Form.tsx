import { FormField, Select } from "@shared/ui/Input";
import Section from "./Section";
import { useOptionItemByOptionListKey } from "@entities/option";
import Footer from "./Footer";
import Amenties from "./Amenties";
import optionItemToSelectOption from "@shared/lib/optionItemToSelectOption";
import Transportation from "./Transportation";
import { Controller, useForm } from "react-hook-form";
import { FacilitySchema, type Facility } from "../model";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Form() {
  const { data: optionItems = [] } = useOptionItemByOptionListKey(
    "drinking_water_source",
  );
  const { data: amenityLists = [] } = useOptionItemByOptionListKey(
    "household_amenities",
  );
  const { data: vehicleLists = [] } =
    useOptionItemByOptionListKey("household_vehicles");

  const { data: toiletTypes = [] } =
    useOptionItemByOptionListKey("household_toilets");
  const { data: electricitySources = [] } = useOptionItemByOptionListKey(
    "household_electricity_sources",
  );
  const { data: cookingFuels = [] } = useOptionItemByOptionListKey(
    "household_cooking_fuel_sources",
  );
  const { data: stoveTypes = [] } = useOptionItemByOptionListKey(
    "household_stove_types",
  );

  const { data: altLightSources = [] } = useOptionItemByOptionListKey(
    "household_alternative_light_sources",
  );

  const {
    control,
    // formState: { errors },
  } = useForm<Facility>({
    resolver: zodResolver(FacilitySchema),
    defaultValues: {
      drinkingWater: "",
      toiletType: "",
      electricity: "",
      altLight: "",
      cookingFuel: "",
      stoveType: "",
      amenities: [],
      vehicles: [],
    },
  });

  return (
    <div className="h-full overflow-hidden pt-6">
      <form className="h-full space-y-6 overflow-y-auto">
        <Section
          number={1}
          title="WATER & SANITATION"
          titleNe="खानेपानी र सरसफाई"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Controller
              name="drinkingWater"
              control={control}
              render={({ field }) => (
                <FormField
                  label="DRINKING WATER"
                  labelSuffix={
                    <span className="text-xs text-ink-400">( पिउने पानी )</span>
                  }
                  required
                >
                  <Select
                    placeholder="Select (छान्नुहोस्)"
                    options={
                      optionItems?.map((item) =>
                        optionItemToSelectOption(item),
                      ) || []
                    }
                    onChange={field.onChange}
                  />
                </FormField>
              )}
            />

            <Controller
              name="toiletType"
              control={control}
              render={({ field }) => (
                <FormField
                  label="Toilet Type"
                  labelSuffix={
                    <span className="text-xs text-ink-400">
                      ( शौचालयको प्रकार )
                    </span>
                  }
                  required
                >
                  <Select
                    placeholder="Select (छान्नुहोस्)"
                    options={
                      toiletTypes?.map((item) =>
                        optionItemToSelectOption(item),
                      ) || []
                    }
                    onChange={field.onChange}
                  />
                </FormField>
              )}
            />
          </div>
        </Section>

        <Section number={2} title="ENERGY & COOKING" titleNe="घरायसी सुविधाहरू">
          <div className="grid gap-4 sm:grid-cols-2">
            <Controller
              name="electricity"
              control={control}
              render={({ field }) => (
                <FormField
                  label="Electricity"
                  labelSuffix={
                    <span className="text-xs text-ink-400">
                      ( बत्तीको स्रोत )
                    </span>
                  }
                  required
                >
                  <Select
                    placeholder="Select (छान्नुहोस्)"
                    options={
                      electricitySources?.map((item) =>
                        optionItemToSelectOption(item),
                      ) || []
                    }
                    onChange={field.onChange}
                  />
                </FormField>
              )}
            />

            <Controller
              name="altLight"
              control={control}
              render={({ field }) => (
                <FormField
                  label="Alternative Lighting"
                  labelSuffix={
                    <span className="text-xs text-ink-400">
                      ( वैकल्पिक बत्तीको स्रोत )
                    </span>
                  }
                  required
                >
                  <Select
                    placeholder="Select (छान्नुहोस्)"
                    options={
                      altLightSources?.map((item) => ({
                        value: item.id,
                        labelEn: item.labelEn,
                        labelNe: item.labelNe,
                      })) || []
                    }
                    onChange={field.onChange}
                  />
                </FormField>
              )}
            />

            <Controller
              name="stoveType"
              control={control}
              render={({ field }) => (
                <FormField
                  label="Stove Type"
                  labelSuffix={
                    <span className="text-xs text-ink-400">
                      ( चुल्होको प्रकार )
                    </span>
                  }
                  required
                >
                  <Select
                    placeholder="Select (छान्नुहोस्)"
                    options={
                      stoveTypes?.map((item) =>
                        optionItemToSelectOption(item),
                      ) || []
                    }
                    onChange={field.onChange}
                  />
                </FormField>
              )}
            />

            <Controller
              name="cookingFuel"
              control={control}
              render={({ field }) => (
                <FormField
                  label="Cooking Fuel"
                  labelSuffix={
                    <span className="text-xs text-ink-400">
                      ( खाना पकाउने इन्धन )
                    </span>
                  }
                  required
                >
                  <Select
                    placeholder="Select (छान्नुहोस्)"
                    options={
                      cookingFuels?.map((item) =>
                        optionItemToSelectOption(item),
                      ) || []
                    }
                    onChange={field.onChange}
                  />
                </FormField>
              )}
            />
          </div>
        </Section>

        <Section number={3} title="AMENITIES" titleNe="घरायसी सुविधाहरू">
          <div>
            <Controller
              name="amenities"
              control={control}
              render={({ field }) => (
                <Amenties
                  options={
                    amenityLists?.map((item) =>
                      optionItemToSelectOption(item),
                    ) || []
                  }
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </Section>
        <Section number={4} title="TRANSPORTATION" titleNe="सवारी साधन">
          <div>
            <Controller
              name="vehicles"
              control={control}
              render={({ field }) => (
                <Transportation
                  options={
                    vehicleLists?.map((item) =>
                      optionItemToSelectOption(item),
                    ) || []
                  }
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </Section>

        <Footer onPrevious={() => {}} onNext={() => {}} />
      </form>
    </div>
  );
}
