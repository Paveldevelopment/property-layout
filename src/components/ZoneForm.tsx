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
    validationSchema: Yup.object({
      name: Yup.string().required("Povinné"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(
        addZone({
          id: uuidv4(),
          name: values.name,
          roomIds: [],
        })
      );
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="name">Název zóny:</label>
        <input
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        {formik.touched.name && formik.errors.name && (
          <div>{formik.errors.name}</div>
        )}
      </div>
      <button type="submit">Přidat zónu</button>
    </form>
  );
};

export default ZoneForm;
