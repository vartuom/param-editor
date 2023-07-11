import {
  useEffect,
  useState,
  ChangeEvent,
} from "react";

type Color = any;

interface Param {
  id: number;
  name: string;
  type: "string";
}
interface ParamValue {
  paramId: number;
  value: string;
}
interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}
interface IParamEditorProps {
  params: Param[];
  model: Model;
}

interface EditorState {
  [index: string]: string | undefined;
}

const params: Param[] = [
  { id: 1, name: "Назначение", type: "string" },
  { id: 2, name: "Длина", type: "string" },
];

const productModel: Model = {
  paramValues: [
    { paramId: 1, value: "повседневное" },
    { paramId: 2, value: "макси" },
  ],
  colors: [],
};

const ParamEditor = (props: IParamEditorProps) => {
  const { model, params } = props;
  const [state, setState] = useState<EditorState>({});

  useEffect(() => {
    const editorState: EditorState = {};
    params.forEach((param) => {
      const paramValue = model.paramValues.find(
        (item) => param.id === item.paramId
      )?.value;
      editorState[param.name] = paramValue;
    });
    setState(editorState);
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const convertStateToModel = (): Model => {
    const paramValues: ParamValue[] = Object.keys(state).map((name) => {
      const paramId = params.find((item) => item.name === name)?.id;
      const value = state[name];
      if (!paramId || !value)
        throw new Error(
          `input state property ${name} doesn't exist on params props`
        );
      return {
        paramId: paramId,
        value: value,
      };
    });
    return {
      paramValues: paramValues,
      colors: model.colors,
    };
  };

  const getModel = () => {
    console.log(convertStateToModel())
  }

  return (<>
    <ul>
      {params.map((param) => ( <li key={param.id} style={{display:"grid", gridTemplateColumns: "1fr 1fr"}}>
          <p>{`${param.name}:`}</p>
          <input
            type='text'
            name={param.name}
            placeholder={param.name}
            value={state[param.name] ?? ""}
            onChange={handleInputChange}
            key={`${param.name}${param.id}`}
          ></input>
      </li>
      ))}
    </ul>
  <button
    onClick={getModel}
  >
    Console.log model
  </button>
  </>
  );
};

function App() {
  return (
    <div style={{display: "flex", flexDirection: "column", gap: "8px", width: "320px"}}>
      <ParamEditor model={productModel} params={params} />
    </div>
  );
}

export default App;


