#include <bits/stdc++.h>
using namespace std;

int solve(string s)
{
	int n = s.length();

	int count = 0;

	for (int i = 0; i < n / 2; i++) {
		int left = i;

		int right = n - left - 1;

		while (left < right) {
			if (s[left] == s[right]) {
				break;
			}
			else {
				right--;
			}
		}
		
		if (left == right) {
			return -1;
		}

		for (int j = right; j < n - left - 1; j++) {
			swap(s[j], s[j + 1]);
			count++;
		}
	}

	return count;
}

int swaps(string input1) {
    int ans1 = solve(input1);

	reverse(input1.begin(), input1.end());
	int ans2 = solve(input1);

	return max(ans1, ans2);
}

// Driver code
int main()
{
	string s = "naman";

	// Function calling
	cout << swaps(s);

	return 0;
}
