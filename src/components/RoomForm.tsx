import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../hooks/hooks";
import { addRoom } from "../features/rooms/roomSlice";
import { v4 as uuidv4 } from "uuid";

interface RoomFormValues {
  name: string;
  area: number | "";
  volume: number | "";
}

const RoomForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const formik = useFormik<RoomFormValues>({
    initialValues: { name: "", area: "", volume: "" },
    validationSchema: Yup.object({
      name: Yup.string().required("Povinné"),
      area: Yup.number()
        .typeError("Musí být číslo")
        .required("Povinné")
        .positive(),
      volume: Yup.number()
        .typeError("Musí být číslo")
        .required("Povinné")
        .positive(),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(
        addRoom({
          id: uuidv4(),
          name: values.name,
          area: Number(values.area),
          volume: Number(values.volume),
        })
      );
      resetForm();
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4 mb-6">
      <div className="flex flex-col">
        <label htmlFor="name" className="mb-1 font-medium">
          Jméno místnosti:
        </label>
        <input
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          className="border rounded p-2 focus:ring-2 focus:ring-indigo-400"
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-sm">{formik.errors.name}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="area" className="mb-1 font-medium">
          Plocha:
        </label>
        <input
          id="area"
          name="area"
          value={formik.values.area}
          onChange={formik.handleChange}
          className="border rounded p-2 focus:ring-2 focus:ring-indigo-400"
        />
        {formik.touched.area && formik.errors.area && (
          <p className="text-red-500 text-sm">{formik.errors.area}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="volume" className="mb-1 font-medium">
          Objem:
        </label>
        <input
          id="volume"
          name="volume"
          value={formik.values.volume}
          onChange={formik.handleChange}
          className="border rounded p-2 focus:ring-2 focus:ring-indigo-400"
        />
        {formik.touched.volume && formik.errors.volume && (
          <p className="text-red-500 text-sm">{formik.errors.volume}</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
      >
        Přidat místnost
      </button>
    </form>
  );
};

export default RoomForm;
