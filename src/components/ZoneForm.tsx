import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../hooks/hooks";
import { addZone } from "../features/zones/zoneSlice";
import { v4 as uuidv4 } from "uuid";

interface ZoneFormValues {
  name: string;
}

const ZoneForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const formik = useFormik<ZoneFormValues>({
    initialValues: { name: "" },
    validationSchema: Yup.object({ name: Yup.string().required("Povinné") }),
    onSubmit: (values, { resetForm }) => {
      dispatch(addZone({ id: uuidv4(), name: values.name, roomIds: [] }));
      resetForm();
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4 mb-6">
      <div className="flex flex-col">
        <label htmlFor="name" className="mb-1 font-medium">
          Název zóny:
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
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Přidat zónu
      </button>
    </form>
  );
};

export default ZoneForm;
