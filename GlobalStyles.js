import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #f4f6f8;
    color: #222;
  }
  button, input { font: inherit; }
  button { cursor: pointer; }
  .auth {
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 20px;
  }
  .card {
    width: min(420px, 100%);
    background: white;
    padding: 30px;
    border-radius: 14px;
    box-shadow: 0 8px 30px rgba(0,0,0,.08);
  }
  .card input, .card button, .task-form input, .task-form button {
    width: 100%;
    padding: 12px;
    margin: 7px 0;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  button { border: 0; background: #222; color: white; }
  .error { color: #b00020; }
  .dashboard { width: min(900px, 92%); margin: 40px auto; }
  header { display: flex; justify-content: space-between; align-items: center; }
  header button { width: auto; padding: 10px 16px; }
  .task-form { display: grid; grid-template-columns: 1fr 1fr auto; gap: 10px; margin: 25px 0; }
  .task-form input, .task-form button { margin: 0; }
  .task-form button { width: auto; padding-inline: 20px; }
  .task {
    background: white;
    padding: 16px;
    margin: 10px 0;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    gap: 15px;
    align-items: center;
  }
  .task.done h3 { text-decoration: line-through; opacity: .6; }
  .actions { display: flex; gap: 8px; }
  .actions button { width: auto; padding: 8px 12px; }
  @media (max-width: 650px) {
    .task-form { grid-template-columns: 1fr; }
    .task { align-items: flex-start; flex-direction: column; }
  }
`;
