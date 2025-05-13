import { ModuleRef } from '@nestjs/core';

export interface Strategy {
  init?:(moduleRef: ModuleRef) => void | Promise<void>;
  destroy?:() => void | Promise<void>;
}