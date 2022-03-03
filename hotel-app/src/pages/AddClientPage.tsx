import React, { useEffect, useState } from "react";
import { Message } from "../store/interfaces";
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import { createClient } from "../store/hotel.action";
import { RootState } from "../store/root-reducer";
import { connect, useDispatch } from "react-redux";
import FormAddClient from "./components/client/FormAddClient";
import "./components/styles.css";
import Swal from "sweetalert2";
import CustomBackdrop from "./components/CustomBackdrop";
import { useHistory } from "react-router";
import hotelSlice from "../store/hotelSlice";

type RoomProps = LinkDispatchProps & LinkStateProps;

const AddClientPage: React.FC<RoomProps> = ({
  createClient,
  isFetching,
  message,
}) => {
  useEffect(() => {
    if (message) {
      Swal.fire(message.header, message.text, message.type);
    }
  }, [message]);

  const history = useHistory();
  const dispatch = useDispatch();

  async function submitForm(e: any) {
    e.preventDefault();
    if (
      currentClient.name === "" ||
      currentClient.lastName === "" ||
      currentClient.document === ""
    ) {
      dispatch(
        hotelSlice.actions.setMessage({
          header: "Error when creating the client",
          text: "Please complete all the fields",
          type: "error",
        })
      );
      return;
    }
    await createClient(currentClient);
    history.push("/home");
  }

  const [currentClient, setCurrentClient] = useState<any>({
    name: "",
    lasName: "",
    document: "",
  });

  const onChangeForm = (e: any) => {
    setCurrentClient({
      ...currentClient,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="to-do-list__container">
      <FormAddClient
        submitForm={submitForm}
        onChangeForm={onChangeForm}
        currentClient={currentClient}
      />
      <CustomBackdrop isFetching={isFetching} />
    </div>
  );
};

interface LinkDispatchProps {
  createClient: (client: any) => void;
}

interface LinkStateProps {
  isFetching: boolean;
  error?: string | null;
  message: Message | null;
}

const mapStateToProps = (state: RootState): LinkStateProps => {
  const { isFetching, error, message } = state.hotel;

  return {
    isFetching,
    error,
    message,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, any>
): LinkDispatchProps => ({
  createClient: bindActionCreators(createClient, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddClientPage);
