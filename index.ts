// Made by mumyung
// omlet nick : mumyung1507 (https://omlet.gg/profile/mumyung1507)
// open kakaotalk: https://open.kakao.com/o/sA0YzEid

// 만든 사람: 무명(mumyung)
// 옴렛 닉: mumyung1507 (https://omlet.gg/profile/mumyung1507)
// 1대1 오픈 카톡방: (https://open.kakao.com/o/sA0YzEid)

// 일부 코드는 sos9533scr 참고 (https://github.com/sos9533/sos9533scr)

import { events } from "bdsx/event";
import { ActorCommandSelector, CommandPermissionLevel, PlayerCommandSelector } from "bdsx/bds/command";
import { MinecraftPacketIds } from "bdsx/bds/packetids";
import { ServerPlayer } from "bdsx/bds/player";
import { command } from "bdsx/command";
import { CANCEL } from "bdsx/common";
import { bedrockServer } from "bdsx/launcher";
import * as fs from "fs";

console.log('TPA Plugin allocated');
// before BDS launching

events.serverOpen.on(()=>{
    console.log('TPA Plugin launched');
    // after BDS launched
});

events.serverClose.on(()=>{
    console.log('TPA Plugin closed');
    // after BDS closed
});

if (bedrockServer.isLaunched()) {
    import("./tpa");
} else {
    events.serverOpen.on(() => {
    import("./tpa");
    });
}
