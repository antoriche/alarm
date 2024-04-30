export type Alarm = {
  id: number;
  name?: string;
  time: string; // time format: "HH:mm"
  active: boolean;
};
