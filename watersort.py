# watersort.py

from copy import deepcopy

def can_pour(src, dst, tubes, capacity=4):
    if not tubes[src]: 
        return False  # 空の筒からは注げない
    if len(tubes[dst]) >= capacity:
        return False  # 受け皿が満杯
    top_color = tubes[src][-1]
    # 受け皿が空か、同じ色の上に注げる
    return not tubes[dst] or tubes[dst][-1] == top_color

def pour(src, dst, tubes):
    """実際に src→dst へ注ぐ"""
    color = tubes[src].pop()
    tubes[dst].append(color)

def is_solved(tubes):
    for tube in tubes:
        # 空か、全部同じ色か
        if tube and any(c != tube[0] for c in tube):
            return False
    return True

def display(tubes):
    print("\n".join(
        "[" + "".join(tube).ljust(4, "_") + "]"
        for tube in tubes
    ))
    print("-" * 10)

def main():
    # 初期状態サンプル
    tubes = [
        list("RGBR"),
        list("BGRG"),
        [],
        []
    ]
    while not is_solved(tubes):
        display(tubes)
        s = input("注ぐ元の筒番号を入力 (0-3): ")
        d = input("注ぐ先の筒番号を入力 (0-3): ")
        try:
            src, dst = int(s), int(d)
            if can_pour(src, dst, tubes):
                pour(src, dst, tubes)
            else:
                print("そこには注げません！")
        except (ValueError, IndexError):
            print("正しい数字を入力してください。")
    print("🎉 クリア！ 🎉")

if __name__ == "__main__":
    main()

