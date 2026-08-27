import { z } from "zod";
import { rqMsg } from "./helpers";

export const shippingOrderHeaderSchema = z.object({
  warehouseAgencyBusinessLineId: z
    .number({ error: rqMsg("bodega") })
    .int({ message: "La bodega debe ser un número entero" })
    .min(1, { message: rqMsg("bodega") }),
  date: z.string({ error: rqMsg("fecha") }).min(1, { message: rqMsg("fecha") }),
  carrierCompanyId: z
    .number({ error: rqMsg("empresa transportista") })
    .int({ message: "La empresa transportista debe ser un número entero" })
    .min(1, { message: rqMsg("empresa transportista") }),
  carrierCompanyDriverId: z
    .number({ error: rqMsg("conductor") })
    .int({ message: "El conductor debe ser un número entero" })
    .min(1, { message: rqMsg("conductor") }),
  carrierCompanyVehicleId: z
    .number({ error: rqMsg("vehículo") })
    .int({ message: "El vehículo debe ser un número entero" })
    .min(1, { message: rqMsg("vehículo") }),
  transportStartDate: z
    .string({ error: rqMsg("fecha inicio transporte") })
    .min(1, { message: rqMsg("fecha inicio transporte") }),
  transportEndDate: z
    .string({ error: rqMsg("fecha fin transporte") })
    .min(1, { message: rqMsg("fecha fin transporte") }),
  observation: z.string().optional(),
});

export const shippingOrderItemSerialSchema = z.object({
  id: z
    .number({ error: rqMsg("serial del ítem") })
    .int({ message: "El serial del ítem debe ser un número entero" })
    .min(1, { message: rqMsg("serial del ítem") }),
  serial: z.string({ error: rqMsg("serial del ítem") }).min(1, { message: rqMsg("serial del ítem") }),
});

export const shippingOrderDetailSchema = z
  .object({
    id: z.number().optional(),
    uuid: z.string({ error: rqMsg("uuid") }).min(1, { message: rqMsg("uuid") }),
    warehouseDispatchDetailId: z
      .number({ error: rqMsg("detalle de despacho") })
      .int({ message: "El detalle de despacho debe ser un número entero" })
      .min(1, { message: rqMsg("detalle de despacho") }),
    warehouseDispatchDetailItemDescription: z.string(),
    warehouseDispatchDetailItemCode: z.string(),
    warehouseDispatchDetailItemId: z.number(),
    warehouseDispatchDetailItemAvailableQuantity: z.number(),
    warehouseDispatchDetailItemIsSerialized: z.boolean().catch(false),
    warehouseDispatchDetailDestinationCantonName: z.string(),
    dispatchedQuantity: z
      .number({ error: rqMsg("cantidad despachada") })
      .int({ message: "La cantidad despachada debe ser un número entero" })
      .min(1, { message: rqMsg("cantidad despachada") }),
    itemSerialIds: z.array(shippingOrderItemSerialSchema),
  })
  .superRefine((data, ctx) => {
    if (data.dispatchedQuantity > data.warehouseDispatchDetailItemAvailableQuantity) {
      ctx.addIssue({
        code: "custom",
        path: ["dispatchedQuantity"],
        message: "La cantidad por despachar no puede ser mayor a la cantidad disponible para despachar",
      });
    }
  });

export const shippingOrderCreatePayloadSchema = z.object({
  header: shippingOrderHeaderSchema,
  details: z.array(shippingOrderDetailSchema).min(1, { message: "Debe registrar al menos un detalle" }),
});

export type IShippingOrderHeader = z.infer<typeof shippingOrderHeaderSchema>;
export type IShippingOrderItemSerial = z.infer<typeof shippingOrderItemSerialSchema>;
export type IShippingOrderDetail = z.infer<typeof shippingOrderDetailSchema>;
export type IShippingOrderCreateFormPayload = z.infer<typeof shippingOrderCreatePayloadSchema>;

const propertiesFieldSchema = z.object({
  type: z.enum([
    "text",
    "textarea",
    "number",
    "email",
    "url",
    "phone",
    "password",
    "boolean",
    "date",
    "formatDate",
    "enum",
    "object",
    "array",
    "header",
    "details",
  ]),
  label: z.string(),
  name: z.string(),
  placeholder: z.string().optional(),
  required: z.boolean().optional(),
  options: z.array(z.object({
    label: z.string(),
    value: z.union([z.string(), z.number(), z.boolean()]),
  })).optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  step: z.number().optional(),
  integer: z.boolean().optional(),
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
  minItems: z.number().int().nonnegative().optional(),
  maxItems: z.number().int().nonnegative().optional(),
  pattern: z.string().optional(),
  format: z.string().optional(),
  enum: z.array(z.string()).optional(),
  defaultValue: z.unknown().optional(),
});



export type IPropertiesField = z.infer<typeof propertiesFieldSchema>;

export interface IFormSchemaBase {
  field: IPropertiesField;
  fields?: IFormSchemaBase[];
}

export const formSchemaBase: z.ZodType<IFormSchemaBase> = z.lazy(() =>
  z.object({
    field: propertiesFieldSchema,
    fields: z.array(formSchemaBase).optional(),
  })
);

export type TFormSchemaBase = z.infer<typeof formSchemaBase>;



export const formTal: TFormSchemaBase[] = [
  {
    field: {
      type: "header",
      name: "header",
      label: "Encabezado",
      required: true,
    },
    fields: [
      {
        field: {
          type: "number",
          name: "warehouseAgencyBusinessLineId",
          label: "Bodega",
          placeholder: "Ingrese la bodega",
          required: true,
          integer: true,
          min: 1,
        },
      },
      {
        field: {
          type: "date",
          name: "date",
          label: "Fecha",
          placeholder: "Ingrese la fecha",
          required: true,
        },
      },
      {
        field: {
          type: "number",
          name: "carrierCompanyId",
          label: "Empresa transportista",
          placeholder: "Seleccione la empresa transportista",
          required: true,
          integer: true,
          min: 1,
        },
      },
      {
        field: {
          type: "number",
          name: "carrierCompanyDriverId",
          label: "Conductor",
          placeholder: "Seleccione el conductor",
          required: true,
          integer: true,
          min: 1,
        },
      },
      {
        field: {
          type: "number",
          name: "carrierCompanyVehicleId",
          label: "Vehículo",
          placeholder: "Seleccione el vehículo",
          required: true,
          integer: true,
          min: 1,
        },
      },
      {
        field: {
          type: "date",
          name: "transportStartDate",
          label: "Fecha de inicio de transporte",
          placeholder: "Ingrese la fecha de inicio",
          required: true,
        },
      },
      {
        field: {
          type: "date",
          name: "transportEndDate",
          label: "Fecha de fin de transporte",
          placeholder: "Ingrese la fecha de fin",
          required: true,
        },
      },
      {
        field: {
          type: "textarea",
          name: "observation",
          label: "Observación",
          placeholder: "Ingrese una observación",
        },
      },
    ],
  },
  {
    field: {
      type: "details",
      name: "details",
      label: "Detalles",
      required: true,
      minItems: 1,
    },
    fields: [
      {
        field: {
          type: "number",
          name: "id",
          label: "Identificador",
          integer: true,
        },
      },
      {
        field: {
          type: "text",
          name: "uuid",
          label: "UUID",
          placeholder: "Ingrese el UUID",
          required: true,
          format: "uuid",
        },
      },
      {
        field: {
          type: "number",
          name: "warehouseDispatchDetailId",
          label: "Detalle de despacho",
          required: true,
          integer: true,
          min: 1,
        },
      },
      {
        field: {
          type: "text",
          name: "warehouseDispatchDetailItemDescription",
          label: "Descripción del ítem",
          required: true,
        },
      },
      {
        field: {
          type: "text",
          name: "warehouseDispatchDetailItemCode",
          label: "Código del ítem",
          required: true,
        },
      },
      {
        field: {
          type: "number",
          name: "warehouseDispatchDetailItemId",
          label: "Ítem",
          required: true,
        },
      },
      {
        field: {
          type: "number",
          name: "warehouseDispatchDetailItemAvailableQuantity",
          label: "Cantidad disponible",
          required: true,
        },
      },
      {
        field: {
          type: "boolean",
          name: "warehouseDispatchDetailItemIsSerialized",
          label: "Ítem serializado",
          defaultValue: false,
        },
      },
      {
        field: {
          type: "text",
          name: "warehouseDispatchDetailDestinationCantonName",
          label: "Cantón de destino",
          required: true,
        },
      },
      {
        field: {
          type: "number",
          name: "dispatchedQuantity",
          label: "Cantidad despachada",
          required: true,
          integer: true,
          min: 1,
        },
      },
      {
        field: {
          type: "array",
          name: "itemSerialIds",
          label: "Seriales del ítem",
          required: true,
        },
        fields: [
          {
            field: {
              type: "number",
              name: "id",
              label: "Identificador del serial",
              required: true,
              integer: true,
              min: 1,
            },
          },
          {
            field: {
              type: "text",
              name: "serial",
              label: "Serial del ítem",
              placeholder: "Ingrese el serial",
              required: true,
              minLength: 1,
            },
          },
        ],
      },
    ],
  },
];