import React from "react";
import CurrentTime from "../CurrentTime/CurrentTime";
import AlarmManager from "../AlarmManager/AlarmManager";

import style from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={style.container}>
      <header>
        <h1>The Alarm App</h1>
      </header>
      <main className={style.main}>
        <section className={style.clock_section}>
          <CurrentTime />
        </section>
        <section className={style.alarm_section}>
          <AlarmManager />
        </section>
      </main>
    </div>
  );
};

export default Layout;
