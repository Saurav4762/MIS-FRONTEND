export type ChartItem = {
    label: string;
    value: number;
};

export type AllReportsData = {
    ageGroups: ChartItem[];
    bloodGroups: ChartItem[];
    houseTypes: ChartItem[];
    roofTypes: ChartItem[];
    wallTypes: ChartItem[];
    landTypes: ChartItem[];
    ethnicities: ChartItem[];
    religions: ChartItem[];
    education: ChartItem[];
    wards: ChartItem[];
};

export type AllReportsResponse = {
    data: AllReportsData;
    timestamp: string;
};
