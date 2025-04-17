import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme-provider";

export interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={className}
    >
      <Badge variant="outline" className="bg-mossGreen/5 text-mossGreen border-mossGreen/20">
        {theme === "light" ? "Light" : "Dark"} Mode
      </Badge>
    </Button>
  );
}
