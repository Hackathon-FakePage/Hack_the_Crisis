# WARNING: Only array of number between 0 and 2 will give proper result!
def calculate_reliability_score(array):
    if array == []:
        return None
    else:
        return sum(array) / len(array)

# Example usage
reliability_score = calculate_reliability_score([0,1,2,0,2,0,1,1])
print(reliability_score)
