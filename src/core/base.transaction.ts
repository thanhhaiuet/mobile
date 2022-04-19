import { EntityManager, Transaction, TransactionManager } from 'typeorm';

const symbolTransaction = Symbol('base_trans:tran');
const symbolResKey = Symbol('base_trans:resKey');

export type TransactionOptions = { [x: string]: any };

export abstract class BaseTransaction<T extends TransactionOptions, R = any> {
  protected returnLastValue: boolean;
  protected results = {} as { [x: string]: any };
  protected manager: EntityManager;

  private _transactionOrders: string[];
  private _resKeys: { [x: string]: string };

  constructor(protected opts: T) {
    this._transactionOrders = Reflect.getMetadata(symbolTransaction, this);
    this._resKeys = Reflect.getMetadata(symbolResKey, this);
  }

  /**
   * exection transaction
   */
  async exec() {
    try {
      const res = await this._execTransaction.call(this);
      return this.onSuccess(res);
    } catch (error) {
      this.onError(error);
    }
  }

  @Transaction()
  private async _execTransaction(@TransactionManager() manager: EntityManager) {
    this.manager = manager;
    const methods = this._transactionOrders;
    for (let i = 0; i < methods.length; i++) {
      const method = methods[i];
      const res = await (this[method] as Function).call(this);
      if (this._resKeys?.[method]) {
        this.results[this._resKeys[method]] = res;
      }
      if (this.returnLastValue && i === methods.length - 1) {
        return res;
      }
    }
    return this.results;
  }

  protected onSuccess(result: R): R {
    return result;
  }

  protected onError(error: any) {
    console.log(error);
  }
}

/**
 *
 * @param resKey if provided, property `results` with the key is this and value is this method value return
 * @description The order of functions with this decorator in the class is the order of execution
 */
export function TransactionAction(resKey?: string) {
  return function (target: BaseTransaction<any>, propertyKey: string) {
    if (target instanceof BaseTransaction) {
      metadataAddMethodHandler(target, propertyKey);
      metadataAddResKey(target, propertyKey, resKey);
    }
  };
}

function metadataAddMethodHandler(
  target: BaseTransaction<any>,
  propertyKey: string,
) {
  let metadata = Reflect.getMetadata(symbolTransaction, target) as string[];
  if (!metadata) {
    metadata = [];
    Reflect.defineMetadata(symbolTransaction, metadata, target);
  }
  metadata.push(propertyKey);
}

function metadataAddResKey(
  target: BaseTransaction<any>,
  propertyKey: string,
  resKey: string,
) {
  if (resKey) {
    let meta = Reflect.getMetadata(symbolResKey, target) as {
      [x: string]: string;
    };
    if (!meta) {
      meta = {};
      Reflect.defineMetadata(symbolResKey, meta, target);
    }
    meta[propertyKey] = resKey;
  }
}
