import React from "react";

const CompletedText = (percentage) => {
  let texts = {
    textCompletedH3: "Has completado tus tareas",
    textCompletedP1: "Felicitaciones has llegado al 100%",
    textCompletedP2: "",
  };
  let texts2 = {
    textPendingH3: "Tienes tareas pendientes",
    textPendingP1: "Te damos algunos tips para que tu tienda sea perfecta.",
    textPendingP2: "Completa el 100% de toda la configuración, es muy fácil",
  };
  return (
    <div>
      {percentage.percentage === 100 ? (
        <>
          <h3>{texts.textCompletedH3} </h3>
          <p>{texts.textCompletedP1}</p>
          <p>{texts.textCompletedP2}</p>
        </>
      ) : (
        <>
          <h3>{texts2.textPendingH3} </h3>
          <p>{texts2.textPendingP1}</p>
          <p>{texts2.textPendingP2}</p>
        </>
      )}
    </div>
  );
};

export default CompletedText;
