import { Request, Response } from "express";
import { APIFailResponse, APIResponse } from "../../../functions/api-response.func";
import { ExpressRequestJWTPayloadExtractor } from "../../../functions/express-request-jwt-payload-extractor.func";
import { ServerMainService } from "../../../../services/server.service";
import { MeetingStatusTypes, UserAccount } from "@shared/entities";
import { MainEntitiesRepoManagerService } from "../../../../datasources/main-entities-ds/repos-manger";
import { In } from "typeorm";

const {MeetingEntityRepo} = MainEntitiesRepoManagerService

export async function MeetCTRL_RF_bookAMeetingValidator (req: Request, res: Response) {
    try {
      const {accountId} = ExpressRequestJWTPayloadExtractor(req),

      {CAHCED_SIGNED_IN_ACCOUNTS} = ServerMainService

      let account = await CAHCED_SIGNED_IN_ACCOUNTS.find(acct => acct.id == accountId)

      if(!account) throw Error("failed to get account in cache")

      const {currentMembership, currentLeadership} = account as UserAccount,

      MyCell = currentLeadership?.cell ?? currentMembership?.cell

      if(!MyCell) throw Error("you need to own or be part of a cell to book a meeting")

      if(MyCell.suspension) throw Error("cell is currently suspended")

      if(currentMembership?.suspension) throw Error("oops suspended members cannot book meetings")

      const permission = currentLeadership?.cell_permission ?? currentMembership?.cell_permission

      if(!permission) throw Error("oops you are not authorized to book meetings")

      if(!permission.meeting_permissions.create)
        if(currentMembership)
          throw Error("oops you do not have the permission to book meetings, please consult your cell leader")
        else
          throw Error("oops you do not have the permission to book meetings")

      const upcomingMeeting = await MeetingEntityRepo.findOne(
        {
          where: {
            cell: {id: Number(MyCell.id)},
            
            status: In<MeetingStatusTypes>(["booked", "in-session", "pending"])
          },

          select: {id: true, status: true}
        }
      )

      if(upcomingMeeting) {
        const {status} = upcomingMeeting

        if(status == "booked") throw Error('new meetings cannot be booked while there is still a meeting to be held')
        
        else throw Error('new meetings cannot be booked while there is still an unfinished meeting')
      }

      res.json(APIResponse())

    } catch (error: any) {
      res.json(APIFailResponse(error.message))
    }
}