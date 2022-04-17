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
import { Player, ServerPlayer } from "bdsx/bds/player";
import { command } from "bdsx/command";
import { CANCEL } from "bdsx/common";
import { bedrockServer } from "bdsx/launcher";
import * as fs from "fs";
import { networkInterfaces } from "os";

let tpa: any = {};

function CreateFile(filepath: string, value = {}) {
    if (!fs.existsSync(filepath)) {
        fs.writeFileSync(filepath, JSON.stringify(value));
        console.log("tpa.json created");
    }
}
CreateFile(`tpa.json`);

command.register("tpa", "티피 요청을 합니다.").overload((param, origin, output) => {
    const actor = origin.getName();
        for (const player of param.target.newResults(origin, ServerPlayer)) {
            tpa[player.getName()] = actor
            let ni = player.getNetworkIdentifier()
            fs.writeFileSync(`tpa.json`, JSON.stringify(tpa), "utf8")
            bedrockServer.executeCommand(`tellraw "${player.getName()}" {"rawtext":[{"text":"§l§d${actor}§e님이 당신에게 티피요청을 보냈습니다 30초 뒤에 취소 됩니다. §b\n수락 하는방법: /tpaccept"}]}`)
            bedrockServer.executeCommand(`tellraw "${actor}" {"rawtext":[{"text":"§l§d${player.getName()}§e님에게 TPA를 정상적으로 보냈습니다"}]}`)
            setTimeout(() => {
                tpa[player.getName()] = ""
                fs.writeFileSync(`tpa.json`, JSON.stringify(tpa), "utf8")
                bedrockServer.executeCommand(`tellraw "${player.getName()}" {"rawtext":[{"text":"§l${actor}님이 보낸 tpa 요청이 끝났습니다."}]}`)
                bedrockServer.executeCommand(`tellraw "${actor}" {"rawtext":[{"text":"§l당신이 ${player.getName()}님에게 보낸 tpa 요청이 끝났습니다."}]}`)
            }, 30001)
        }
    }, {
        target: PlayerCommandSelector,
    });
command.register("tpaccept", "티피 요청을 받습니다.").overload((param, o, op) => {
    const player = o.getEntity();
    if (player?.isPlayer) {
        let ni = player.getNetworkIdentifier()
        const tpas = JSON.parse(fs.readFileSync(`tpa.json`, "utf8"));
        if (tpas[ni.getActor()!.getName()] !== "") {
            bedrockServer.executeCommand(`tp "${tpa[ni.getActor()!.getName()]}" ${player.getName()}`)
            bedrockServer.executeCommand(`tellraw "${tpa[ni.getActor()!.getName()]}" {"rawtext":[{"text":"§l§e${player.getName()}§a님에게 정상적으로 티피 되었습니다."}]}`)
            tpa[player.getName()] = ""
            fs.writeFileSync(`tpa.json`, JSON.stringify(tpa), "utf8")
        }
        if (tpas[ni.getActor()!.getName()] == "") {
            bedrockServer.executeCommand(`tellraw "${player.getName()}" {"rawtext":[{"text":"§l당신에게 온 티피 요청이 없습니다."}]}`)
        }
    }
}, {});
command.register("tpadeny", "티피 요청을 거절 합니다.").overload((param, origin, op) => {
    const actor = origin.getEntity();
    if (actor?.isPlayer) {
        let ni = actor.getNetworkIdentifier()
        const tpas = JSON.parse(fs.readFileSync(`tpa.json`, "utf8"));
        tpa[actor.getName()] = ""
        fs.writeFileSync(`tpa.json`, JSON.stringify(tpa), "utf8")
    }
}, {
    target: PlayerCommandSelector
})








events.packetBefore(MinecraftPacketIds.CommandRequest).on((ev, ni) => {
    if (ev.command == "/mumyungplugin") {
        bedrockServer.executeCommand(`tellraw @a {"rawtext":[{"text":"§c이 서버는 mumyung님의 플러그인을 사용 중 입니다."}]}`)
    }
})
