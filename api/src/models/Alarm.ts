import { Alarm as AlarmType } from "shared/Alarm";
import { Table, Column, Model, DataType, AllowNull, Default } from "sequelize-typescript";
import dayjs from "dayjs";

@Table({ tableName: "alarms" })
export class Alarm extends Model implements AlarmType {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @AllowNull(true)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @Column({
    type: DataType.TIME,
    get() {
      return dayjs(this.getDataValue("time")).format("HH:mm");
    },
    set(value: string) {
      this.setDataValue("time", dayjs(value, "HH:mm").toDate());
    },
  })
  time: string;

  @AllowNull(false)
  @Default(true)
  @Column(DataType.BOOLEAN)
  active: boolean;
}
