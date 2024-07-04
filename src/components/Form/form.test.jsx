import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./index";

test("Koşulların onaylanma durumuna göre button aktifliği", () => {
    // 1) Test edilecek bileşen render edilir
render (<Form/>)

    // 2) Gerekli elementleri çağır (checkbox || button)
    const checkbox = screen.getByRole("checkbox");
    const button = screen.getByRole("button");

    // 3) Checkbox tiklenmemiş mi kontrol et
    expect(checkbox).not.toBeChecked();
    //? toBeChecked inputun tiklenip tiklenmediğini kontrol eder. not ifadesi ise tiklenmemiş anlamı katar...

    // 4) Button inaktif mi kontrol et
    expect(button).toBeDisabled();

    // 5) Checkbox'ı tikle
    fireEvent.click(checkbox);

    // 6) Button aktif mi kontrol et
    expect(button).toBeEnabled();

    // 7) Checkbox'tan tiki kaldır
    fireEvent.click(checkbox);

    // 8) Button inaktif mi kontrol et
    expect(button).toBeDisabled();
});

test("Butonun hover durumuna göre bildirim gözükür", () => {
    // 1) Formu renderla
    render(<Form/>);
  
    // 2) Gerekli elementleri al
    const checkbox = screen.getByRole("checkbox");
    const button = screen.getByRole("button");
    const alert = screen.queryByText(/size gerçekten/i);
  
    // 3) Bildirimin ekranda olmadığını kontrol et
    expect(alert).not.toBeVisible();
  
    // 4) Checkbox'ı tikle
    fireEvent.click(checkbox);
  
    // 5) Mouse'u butonun üzerine getir
    fireEvent.mouseEnter(button);
  
    // 6) Ekranda bildirim var mı kontrol et
    expect(screen.queryByText(/size gerçekten/i)).toBeVisible();
  
    // 7) Mouse'u butondan çek
    fireEvent.mouseLeave(button);
  
    // 8) Bildirimin ekranda olmadığını kontrol et
    expect(screen.queryByText(/size gerçekten/i)).not.toBeVisible();
});
