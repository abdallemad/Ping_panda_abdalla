"use client";
import React from "react";
import { Modal } from "../ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import useCreateCategory from "@/hooks/use-create-category";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { COLORS_OPTIONS, EMOJI_OPTIONS } from "@/constant";

function CreateEventCategoryModel({
  children,
  wrapperClassName,
}: {
  children: React.ReactNode;
  wrapperClassName?: string;
}) {
  const {
    form,
    handleSubmit,
    isCreating,
    isOpen,
    setIsOpen,
  } = useCreateCategory();
  return (
    <>
      <div onClick={() => setIsOpen(true)} className={wrapperClassName}>
        {children}
      </div>
      <Modal
        showModal={isOpen}
        setShowModal={setIsOpen}
        className="max-w-xl p-8"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div>
              <h2 className="text-lg/7 font-medium tracking-tight text-gray-950">
                Create Event Category
              </h2>
              <p className="text-sm/6 text-gray-600">
                Create new category to organize your events
              </p>
            </div>
            <div className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input autoFocus placeholder="Category name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <div className="flex flex-wrap gap-3 mb-2">
                        {COLORS_OPTIONS.map((color) => (
                          <button
                            key={color}
                            type="button"
                            className={cn(
                              `bg-[${color}]`,
                              "size-10 rounded-full ring-offset-2 ring-2 ring-transparent transition-all duration-300 hover:scale-105",
                              {
                                " ring-brand-700 scale-110":
                                  color === field.value,
                              }
                            )}
                            onClick={() => field.onChange(color)} // Update selected option
                          ></button>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emoji"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emoji</FormLabel>
                    <FormControl>
                      <div className="flex flex-wrap gap-3">
                        {EMOJI_OPTIONS.map((emoji) => (
                          <button
                            key={emoji.emoji}
                            type="button"
                            className={cn(
                              "size 10 flex items-center justify-center text-xl rounded-md transition-all bg-brand-100 hover:border-brand-200",
                              {
                                "bg-brand-100 ring-2 ring-brand-700 scale-110":
                                  emoji.emoji === field.value,
                              }
                            )}
                            onClick={() => field.onChange(emoji.emoji)} // Update selected option
                          >
                            {emoji.emoji}
                          </button>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button
                type="button"
                variant={"outline"}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button disabled={isCreating} type="submit">
                {isCreating ? "Creating..." : "Create Category"}
              </Button>
            </div>
          </form>
        </Form>
      </Modal>
    </>
  );
}

export default CreateEventCategoryModel;
