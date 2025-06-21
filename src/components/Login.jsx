import React, { useState, useEffect } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/; // Strong password: en az 8 karakter, büyük harf, küçük harf ve sayı

export default function Login({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const newErrors = {};

    if (!emailRegex.test(email)) {
      newErrors.email = "Geçerli bir email giriniz.";
    }

    if (!passwordRegex.test(password)) {
      newErrors.password = "Şifre en az 8 karakter, büyük, küçük harf ve sayı içermeli.";
    }

    if (!termsAccepted) {
      newErrors.terms = "Şartları kabul etmelisiniz.";
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }, [email, password, termsAccepted]);

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      onSuccess();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label><br />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
      </div>
      <div>
        <label>Şifre:</label><br />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        {errors.password && <div style={{ color: "red" }}>{errors.password}</div>}
      </div>
      <div>
        <label>
          <input type="checkbox" checked={termsAccepted} onChange={e => setTermsAccepted(e.target.checked)} />
          Şartları kabul ediyorum
        </label>
        {errors.terms && <div style={{ color: "red" }}>{errors.terms}</div>}
      </div>
      <button type="submit" disabled={!isValid}>Login</button>
    </form>
  );
}
