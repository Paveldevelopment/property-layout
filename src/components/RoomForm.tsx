import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup"; // PAV proc ta hvezdicka?
import { useAppDispatch } from "../hooks/hooks";
import { addRoom } from "../features/rooms/roomSlice";
import { v4 as uuidv4 } from "uuid";

interface RoomFormValues {
  name: string;
  area: number | "";
  volume: number | ""; // PAV proc ty prazdny strings?
}

const RoomForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik<RoomFormValues>({
    initialValues: {
      name: "",
      area: "",
      volume: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Povinné"),
      area: Yup.number()
        .typeError("Musí být číslo")
        .required("Povinné")
        .positive("Musí být kladné"),
      volume: Yup.number()
        .typeError("Musí být číslo")
        .required("Povinné")
        .positive("Musí být kladné"),
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
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="name">Jméno místnosti:</label>
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
      <div>
        <label htmlFor="area">Plocha:</label>
        <input
          id="area"
          name="area"
          value={formik.values.area}
          onChange={formik.handleChange}
        />
        {formik.touched.area && formik.errors.area && (
          <div>{formik.errors.area}</div>
        )}
      </div>
      <div>
        <label htmlFor="volume">Objem:</label>
        <input
          id="volume"
          name="volume"
          value={formik.values.volume}
          onChange={formik.handleChange}
        />
        {formik.touched && formik.errors.volume && (
          <div>{formik.errors.volume}</div>
        )}
      </div>
      <button type="submit">Přidat místnost</button>
    </form>
  );
};

export default RoomForm;
