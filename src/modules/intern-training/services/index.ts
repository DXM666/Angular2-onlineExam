import { GetMessageService} from './product.service';
import { SearchUserService} from './searchUser';
import {sendMessageService} from './sendMessage';
import { GetUserService } from  './GetUser';
import {ScoreService} from "./score.service";
import {TemSaveService} from "./TemSave";

export {
  GetMessageService,
  SearchUserService,
  sendMessageService,
  GetUserService,
  ScoreService
};

export const ALL_SERVICES = [
  GetMessageService,
  SearchUserService,
  sendMessageService,
  GetUserService,
  ScoreService
];
