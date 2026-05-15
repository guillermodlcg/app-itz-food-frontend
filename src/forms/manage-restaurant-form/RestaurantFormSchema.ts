
import {z} from 'zod';

export const formSchema= z.object({
    restaurantName: z.string({
        required_error: 'El nombre del restaurante es requerido'
    }).min(1, { message: 'El nombre del restaurante es requerido' }),
    city: z.string({
        required_error: 'El nombre de la ciudad es requerido'
    }).min(1, { message: 'El nombre de la ciudad es requerido' }),
    country: z.string({
        required_error: 'El nombre del pais es requerido'
    }).min(1, { message: 'El nombre del pais es requerido' }),
    deliveryPrice: z.coerce.number({
        required_error: 'El precio de entrega es requerido',
        invalid_type_error: 'El precio debe ser un numero valido'
    }).min(1, { message: 'El precio de entrega es requerido' }),
    estimatedDeliveryTime: z.coerce.number({
        required_error: 'El tiempo estimado de entrega es requerido',
        invalid_type_error: 'El tiempo estimado de entrega debe ser un numero valido'
    }).min(1, { message: 'El tiempo estimado de entrega es requerido' }),
    cuisines: z.array(z.string()).nonempty({
        message: 'Selecciona al menos una cocina'
    }),
    menuItems: z.array(
        z.object({
            name: z.string({required_error:'El nombre debe ser requerido'})
            .min(1, {message: 'El nombre debe tener al menos 1 caracter'}),
            price: z.coerce.number({required_error: 'El precio es requerido',
                invalid_type_error: 'El precio debe ser un numero valido'
             })
            })
    ),
    imagenFile: z.instanceof(File,{message: 'Imagen es requerida'}).optional(),
    imagenUrl: z.string().optional()

});
