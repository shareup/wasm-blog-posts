#include <stdlib.h>

__attribute__((export_name("allocate_reverse")))
void ** allocate_reverse(uint32_t length) {
  unsigned char *original = malloc(length);
  unsigned char *reversed = malloc(length);
  uint32_t *stored_length = malloc(sizeof(uint32_t));

  *stored_length = length;

  void **pointers = malloc(sizeof(size_t) * 3);
  pointers[0] = stored_length;
  pointers[1] = original;
  pointers[2] = reversed;

  return pointers;
}

__attribute__((export_name("reverse")))
int reverse(void **pointers) {
  const uint32_t length = *(uint32_t *)pointers[0];
  const unsigned char *original = (unsigned char *)pointers[1];
  unsigned char *reversed = (unsigned char *)pointers[2];

  for (int i = 0; i < length; i++) {
    int position = length - i - 1;
    reversed[position] = original[i];
  }

  return 0;
}

__attribute__((export_name("free_reverse")))
int free_reverse(void **pointers) {
  void *length = pointers[0];
  void *original = pointers[1];
  void *reversed = pointers[2];

  free(length);
  free(original);
  free(reversed);

  return 0;
}

int main() {
  return 0;
}
