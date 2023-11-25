export type Interval = {
  id: string;
  start: {
    hours: number;
    minutes: number;
  };
  end: {
    hours: number;
    minutes: number;
  };
};

export type Week = {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
};
