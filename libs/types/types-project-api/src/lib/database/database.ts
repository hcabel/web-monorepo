import { IStatSchema, IStatDocument, IStatModel} from "./models/stat.interface";
import { Dotnation } from "../utils/mongoose.interface";

export interface IProjectApiQueries {
Stat: {
create(data: IStatSchema): Promise<IStatDocument | null>,
delete_one(filter: IStatSchema): Promise<boolean | null>,
read(filter: Partial<IStatSchema>): Promise<IStatModel[] | null>,
read_single(filter: Partial<IStatSchema & Dotnation>): Promise<IStatModel | null>,
update_one(filter: Partial<IStatSchema>, set: Partial<IStatSchema>): Promise<IStatModel | null>
}
};
