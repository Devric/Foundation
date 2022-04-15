import { Container } from "./CQRS.Container";

/**
 *  Register Command
 *
 *  Usage
 *  @Command(AddCart.Command)
 *  class AddCart() {
 *  	public static get Command():string {return "ADD_CART";}
 *  }
 *
 */

export function Command(message: string): (target: Function) => void {
    return (target: Function) => {
        // console.log(message);
        Container.Register(message, target);
    };
}

