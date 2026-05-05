import ManageRestaurantFrom from "@/forms/manage-restaurant-form/ManageRestaurantForm"
import { useCreateRestaurant, useGetRestaurante, useUpdateRestaurant } from "@/api/RestauranteApi";

export default function ManageRestaurantPage() {
  const { data: restaurante } = useGetRestaurante();
  const { mutate: createRestaurante, isPending: isCreating } = useCreateRestaurant();
  const { mutate: updateRestaurante, isPending: isUpdating } = useUpdateRestaurant();

  const onSave = restaurante ? updateRestaurante : createRestaurante;

  return (
    <ManageRestaurantFrom
      restaurante={restaurante ?? undefined}
      onSave={onSave}
      isLoading={isCreating || isUpdating}
    />
  );
}
