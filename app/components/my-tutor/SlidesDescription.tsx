function SlidesDescription({ onChange, clearError, onNameChange, name }: { onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void, clearError: () => void, onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void, name: string }) {
  return (
    <form>
      <input
        type="text"
        placeholder="Enter paragraph name..."
        className="rounded text-primary text-[12px] bg-transparent p-2 border border-[var(--bg-card)] w-full mb-2"
        id="paragraphName"
        value={name}
        onChange={onNameChange}
      />
      <textarea
        title="slidesDescription"
        placeholder="Paste a chapter from your slides here..."
        className="rounded text-[12px] bg-transparent p-5 resize-none border border-[var(--bg-card)] w-full"
        id="slidesDescription"
        onChange={(event) => {
          clearError(); // Clear the error when the description changes
          onChange(event);
        }}
      ></textarea>
    </form>
  );
}

export default SlidesDescription;
