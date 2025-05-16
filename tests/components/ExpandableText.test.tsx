import { render, screen } from "@testing-library/react";
import ExpandableText from "../../src/components/ExpandableText";
describe("group", () => {
  it("shouldnt render full text if text is less than limit", () => {
    const text = "Short Text";

    render(<ExpandableText text={text} />);

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it("should truncate if text is longer than limit", () => {
    const text = "a".repeat(256);

    render(<ExpandableText text={text} />);

    const truncatedText = text.substring(0, 255) + "...";
    const button = screen.getByRole("button");

    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    expect(button).toHaveTextContent(/show more/i);
  });

  it("should reveal full text if ", () => {});
});
