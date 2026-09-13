n = int(input("Enter a count of numbers: "))
valid_marks = []

for i in range(n):
    raw_input = input("Enter a number: ").strip()

    is_negative = raw_input.startswith("-") and raw_input[1:].isdigit()
    is_positive_or_zero = raw_input.isdigit()

    if is_positive_or_zero or is_negative:
        num = int(raw_input)
        if 0 <= num <= 100:
            valid_marks.append(num)
if len(valid_marks) == 0:
    print("No valid marks entered.")
else:
    valid_count = len(valid_marks)
    average = sum(valid_marks) / valid_count
    highest = max(valid_marks)
    lowest = min(valid_marks)

    passing_count = 0
    for mark in valid_marks:
        if mark >= 50:
            passing_count += 1

    pass_rate = (passing_count / valid_count) * 100

    print("Number of valid marks:", valid_count)
    print("Average:", f"{average:.2f}")
    print("Highest mark:", highest)
    print("Lowest mark:", lowest)
    print("Pass rate:", f"{pass_rate:.1f}%")