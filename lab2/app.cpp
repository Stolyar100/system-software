#include <iostream>
#include <cstdlib>
#define VARIANT2

using namespace std;

int main ()
{
  int n, t, c;

  cout << "Enter the number of random numbers you want" << endl;
  cin >> n;

  cout << "Random numbers are:" << endl;

  for (c = 1; c <= n; c++)
  {
    t = random();
    cout << t << endl;

    #ifdef VARIANT1
      cout << "VARIANT1 really works" << endl;
    #else
      continue;
    #endif

    #ifdef VARIANT2
      cout << "VARIANT2 really works" << endl;
    #else
      break;
    #endif

    #ifdef VARIANT3
      cout << "VARIANT3 really works" << endl;
    #else
      cout << "Hello World";
    #endif
  }

  return 0;
}


