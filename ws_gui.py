import tkinter as tk

# 色の対応（例: R=赤, G=緑, B=青, Y=黄）
COLOR_MAP = {
    "R": "red",
    "G": "green",
    "B": "blue",
    "Y": "yellow"
}

tubes = [
    ["R","G","B","R"],
    ["B","G","R","G"],
    [],
    []
]

def draw_tubes(canvas, tubes):
    canvas.delete("all")
    tube_width = 40
    tube_height = 160
    for idx, tube in enumerate(tubes):
        x = 60 + idx * 80
        y = 30
        # 筒の外枠
        canvas.create_rectangle(x, y, x + tube_width, y + tube_height, outline="gray", width=2)
        # 中身（下から積む）
        for i, color in enumerate(reversed(tube)):
            cy = y + tube_height - (i+1) * 40
            canvas.create_rectangle(x, cy, x + tube_width, cy + 40, fill=COLOR_MAP.get(color, "white"))

root = tk.Tk()
root.title("Water Sort Preview")

canvas = tk.Canvas(root, width=400, height=220, bg="white")
canvas.pack()

draw_tubes(canvas, tubes)

root.mainloop()
