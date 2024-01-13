import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth";
import { updateChannelDate } from "../../actions/channelUser";
import "./CreateEditChannel.css";
function CreateEditChannel({ setEditCreateChannelBtn }) {
  //   const CurrentUser = {
  //     result: {
  //       email: "abzxy50312@gmail.com",
  //       joinedOn: "2222-07-15T09:57:23.489Z",
  //     },
  //   };

  const CurrentUser = useSelector((state) => state.currentUserReducer);
  const [name, setName] = useState(CurrentUser?.result.name);
  const [desc, setDesc] = useState(CurrentUser?.result.desc);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    if (!name) {
      alert("Plz Enter Name !");
    } else if (!desc) {
      alert("Plz Enter Discription !");
    } else {
      dispatch(
        updateChannelDate(CurrentUser?.result._id, {
          name: name,
          desc: desc,
        })
      );
      setEditCreateChannelBtn(false);
      setTimeout(() => {
        dispatch(login({ email: CurrentUser?.result.email }));
      }, 5500);
    }
  };
  return (
    <div className="container_CreateEditChannel">
      <input
        onClick={() => setEditCreateChannelBtn(false)}
        type="submit"
        name="text"
        value={"X"}
        className="ibtn_x"
      />
      <div className="container2_CreateEditChannel">
        <h1>
          {CurrentUser?.result.name ? <>Edit</> : <>Create </>}
          Your Channel
        </h1>
        <input
          type="text"
          placeholder="Enter Your/Channel Name"
          className="ibox"
          name="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          type="text"
          rows={15}
          placeholder={"Enter channel Description"}
          className={"ibox"}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <input
          type="submit"
          value={"Submit"}
          onClick={handleSubmit}
          className="ibtn"
        />
      </div>
    </div>
  );
}

export default CreateEditChannel;