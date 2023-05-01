import { inject } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { FoodItemService } from "./food-item.service";

export function foodItemResolver(route: ActivatedRouteSnapshot) {
    const id = route.params['id']
    return inject(FoodItemService).getFoodItemById(id)
}