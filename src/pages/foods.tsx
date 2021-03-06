import { Table } from "@/components";
import axios from "axios";
import { NextSeo } from "next-seo";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { usePageActions } from "src/contexts/page-actions-context";
import { useSlideover } from "src/contexts/slideover-context";

import type { Food } from "@prisma/client";
import type { GetStaticProps, InferGetStaticPropsType } from "next";

export const getStaticProps: GetStaticProps<{ foods: Food[] }> = async () => {
  return {
    props: { foods: await getData() },
  };
};

const getData = async (): Promise<Food[]> => {
  const { data } = await axios.get<Food[]>(
    `${process.env.NEXT_PUBLIC_URL}/api/foods`
  );
  return data;
};
export default function FoodsList(
  props: InferGetStaticPropsType<typeof getStaticProps>
): JSX.Element {
  const { data, isSuccess, isLoading } = useQuery("foods", getData, {
    initialData: props.foods,
  });

  const { setOpen } = useSlideover();
  const { setActions } = usePageActions();

  useEffect(() => {
    setActions([
      <button
        onClick={() => {
          setOpen(true);
        }}
        key="create"
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Create
      </button>,
    ]);
  }, [setActions, setOpen]);

  return (
    <>
      <NextSeo title="Foods" />
      {isLoading && <span>Loading...</span>}
      {isSuccess && data && (
        <Table
          data={data}
          editAction={() => {
            return 0;
          }}
          displayColumns={["name", "calories", "protein", "fat", "carbs"]}
          uniqueCol="id"
        />
      )}
    </>
  );
}

FoodsList.auth = true;
FoodsList.pageTitle = "Foods";
