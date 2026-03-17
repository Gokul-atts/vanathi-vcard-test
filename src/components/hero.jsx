import { useState } from "react";
import axios from "axios";
import VanathiImg from "../assets/vanathi.webp";
import Stores from "./stores";
import Img from "../assets/vanathi_v.png";
import { Toast, TOAST_TYPE } from "./toast";

const SCRIPT_URL = import.meta.env.VITE_SCRIPT_URL;

const Hero = () => {
  const [status, setStatus] = useState("init");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    // location: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "mobile") {
      const onlyNumbers = value.replace(/\D/g, "");

      if (onlyNumbers.length > 10) {
        return;
      }

      setForm({
        ...form,
        mobile: onlyNumbers,
      });

      return;
    }

    // Normal fields
    setForm({
      ...form,
      [id]: value,
    });
  };

  // -------- VERIFY MOBILE --------
  const handleVerify = async () => {
    if (!form.mobile) {
      Toast.show({
        type: TOAST_TYPE.ERROR,
        message: "Enter mobile number",
      });
      return;
    }

    try {
      setLoading(true);

      const fd = new FormData();
      fd.append("action", "check");
      fd.append("mobile", form.mobile);

      const res = await axios.post(SCRIPT_URL, fd);

      if (res.data.result === "exists") {
        Toast.show({
          type: TOAST_TYPE.SUCCESS,
          message: "Verified! Showing store details below.",
        });

        setStatus("exists");
      } else {
        Toast.show({
          type: TOAST_TYPE.INFO,
          message: "Mobile not found, please fill details",
        });

        setStatus("not_found");
      }
    } catch {
      Toast.show({
        type: TOAST_TYPE.ERROR,
        message: "Network error!",
      });
    } finally {
      setLoading(false);
    }
  };

  // -------- SUBMIT NEW USER --------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const fd = new FormData();
      fd.append("action", "save");
      fd.append("name", form.name);
      fd.append("mobile", form.mobile);
      // fd.append("location", form.location);

      const res = await axios.post(SCRIPT_URL, fd);

      if (res.data.result === "success") {
        Toast.show({
          type: TOAST_TYPE.SUCCESS,
          message: "Submitted Successfully!",
        });

        setForm({
          name: "",
          mobile: "",
          // location: "",
        });

        setStatus("exists");
      } else if (res.data.result === "duplicate") {
        Toast.show({
          type: TOAST_TYPE.WARNING,
          message: "Mobile already exists!",
        });

        setStatus("exists");
      } else {
        Toast.show({
          type: TOAST_TYPE.ERROR,
          message: "Error submitting the form!",
        });
      }
    } catch {
      Toast.show({
        type: TOAST_TYPE.ERROR,
        message: "Network error! Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="hero hero-bg">
        <div className="hero-left">
          <img src={VanathiImg} alt="Lady" width="100%" className="lady-img" />
        </div>

        <div className="hero-right">
          <div className="form-box">
            <h2>புதிய V Card பெற விண்ணப்பத்தை பூர்த்தி செய்யுங்கள்</h2>

            <label className="mobileLabel">Mobile Number</label>

            <div className="mobile-input-wrapper">
              <span className="mobile-prefix">+91</span>
              <input
                className="mobileV"
                id="mobile"
                type="text"
                placeholder="Enter mobile number"
                required
                value={form.mobile}
                onChange={handleChange}
              />
            </div>
            {status !== "not_found" && (
              <button disabled={loading} onClick={handleVerify}>
                {loading ? "Loading...." : "Verify"}
              </button>
            )}

            {status === "not_found" && (
              <form id="offerForm" onSubmit={handleSubmit}>
                <label>Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  value={form.name}
                  onChange={handleChange}
                />
{/* 
                <label>Shop Location</label>
                <input
                  id="location"
                  type="text"
                  required
                  value={form.location}
                  onChange={handleChange}
                /> */}

                <button disabled={loading} type="submit">
                  {loading ? "Loading...." : "Submit"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
            <div style={{ textAlign: "center" }}>
        <img
          src={Img}
          alt="Lady"
          style={{ width: "40%" }}
          className="lady-img"
        />
      </div>
      {status === "exists" && <Stores />}
    </>
  );
};

export default Hero;
