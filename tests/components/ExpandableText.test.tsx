import { render, screen } from "@testing-library/react";
import ExpandableText from "../../src/components/ExpandableText";
import userEvent from "@testing-library/user-event";

describe("group", () => {
  const limit = 255;
  const longText = "a".repeat(limit + 1);
  const truncateText = longText.substring(0, limit) + "...";

  it("shouldnt render full text if text is less than limit", () => {
    const text = "Short Text";

    render(<ExpandableText text={text} />);

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it("should truncate if text is longer than limit", () => {
    render(<ExpandableText text={longText} />);

    const truncatedText = truncateText;
    const button = screen.getByRole("button");

    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    expect(button).toHaveTextContent(/show more/i);
  });

  it("should expand text when user click the show more button", async () => {
    render(<ExpandableText text={longText} />);

    const button = screen.getByRole("button");
    const user = userEvent.setup();

    await user.click(button);

    expect(screen.getByText(longText)).toBeInTheDocument();
    expect(button).toHaveTextContent(/less/i);
  });

  it("should collapse the text when user click show less button", async () => {
    render(<ExpandableText text={longText} />);

    const button = screen.getByRole("button");
    const user = userEvent.setup();

    await user.click(button);
    await user.click(button);

    expect(screen.getByText(truncateText)).toBeInTheDocument();
    expect(button).toHaveTextContent(/more/i);
  });
});
