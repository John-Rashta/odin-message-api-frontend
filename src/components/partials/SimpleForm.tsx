import { SimpleSubmitFunctionType } from "../../../util/types";

export default function SimpleForm({
  fieldsName,
  submitFunc,
  buttonText,
  possibleDefault,
  className,
}: {
  fieldsName: string;
  submitFunc: SimpleSubmitFunctionType;
  buttonText: string;
  possibleDefault?: string;
  className?: string;
}) {
  return (
    <form
      className={className}
      onSubmit={submitFunc}
      onClick={(e) => e.stopPropagation()}
    >
      <input
        type="text"
        name={fieldsName}
        id={fieldsName}
        defaultValue={possibleDefault || ""}
      />
      <button type="submit">{buttonText}</button>
    </form>
  );
}
