import {DeliveryStatus, OrderInput} from "../../../../main/lib/generated";
import OrderValues from "./order-values";

// TODO: move to folder and split
export function getDefaultOrderValues(data: OrderValues | undefined) {
  return data
    ? {
        ...data,
        /**
         * TODO: remove __typename, check missing typing because OrderValues don't have __typename property
         * but value that passed have
         */
        inventory: data.cart.map(cartItem => ({
          productId: cartItem.productId,
          count: cartItem.count,
        })),
      }
    : {status: DeliveryStatus.Processing};
}

export function deserializeOrderForm(data: OrderInput) {
  return {
    ...data,
    cart: data.cart.map(cartItem => ({productId: cartItem.productId, count: cartItem.count})),
  };
}
