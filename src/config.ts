import { Scope } from '@nestjs/common';

type citadelConfig = {
  crudStrategyScope: Scope
}

export const CitadelConfig : citadelConfig = {
  crudStrategyScope: Scope.DEFAULT,
};