import { ChildEntity } from "typeorm";
import { AccountBaseEntity } from "../account-base-schema/account-base.schema";
import { AdminAccount } from "@shared/entities";

@ChildEntity("admin")
export class AdminAccountEntity extends AccountBaseEntity implements AdminAccount {}