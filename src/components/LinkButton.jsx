function LinkButton({ text, btnType, href }) {
  return (
    <>
      <a href={href} className="`${btnType} ddf`">{text}</a>
    </>
  );
}

export default LinkButton;
