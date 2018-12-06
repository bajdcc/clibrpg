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
  } else if (good[1] === 1) {
    setPlayerValue({
      exping: player.exping + good[4] / good[5]
    });
  }
}

export function taskType(id) {
  switch (id) {
    case 0: return "打败怪物";
    default: break;
  }
  return "task: unknown type";
}

export function randomN() {
  const rand = (Math.floor(Math.random() * 100));
  if (rand >= 0 && rand < 50) {
    return 1;
  }
  if (rand >= 50 && rand < 80) {
    return 2;
  }
  if (rand >= 80 && rand < 95) {
    return 3;
  }
  if (rand >= 95 && rand <= 98) {
    return 5;
  }
  if (rand > 98 && rand <= 99) {
    return 10;
  }
}

export function runN(id) {
  return Math.floor(Math.random() * id) === 0;
}