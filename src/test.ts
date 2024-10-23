import { config } from "process";
import * as CasinoJs from "./index";
import { Casino } from "./index";

// const rank = CasinoJs.Enums.Rank.Ace;

// const rank2 = CasinoJs.Enums.RankEnums.Rank.Ace;

// const anshul = new CasinoJs.PokerPlayer();

const casino = new Casino();

console.log(casino);

const config : CasinoJs.PokerRoomConfig = {id:``,name:``,tableConfig:{id:``,size:2,seats:undefined}};
const room = new CasinoJs.PokerRoom(config);
