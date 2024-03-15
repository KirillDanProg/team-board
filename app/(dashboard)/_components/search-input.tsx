import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useDebounceValue } from "usehooks-ts";
import qs from "query-string";
import React from "react";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebounceValue(value, 500);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: {
          search: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  }, [debouncedValue, router]);
  return (
    <div className="relative w-full">
      <Search className="absolute top-1/2 left-2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        className="w-full max-w-[520px] pl-8 "
        placeholder="Поиск"
        value={value}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default SearchInput;
