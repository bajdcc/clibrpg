import _ from "lodash";
import {setPlayerValue} from "../../store/player-actions";

export function goodTypes(id) {
  switch (id) {
    case 0:
      return "生命";
    case 1:
      return "经验";
    default:
      break;
  }
  return "good: unknown id";
}

export function goodTimes(id) {
  if (id === 0)
    return "立即";
  return `${id}秒内`;
}

export function applyGoodEffect(player, good) {
  if (good[1] === 0) {
    setPlayerValue({
      useblood: _.min([player.blood, player.useblood + good[4] / good[5]])
    });
  }
}