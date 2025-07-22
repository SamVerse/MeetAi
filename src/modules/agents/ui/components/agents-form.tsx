import { useTRPC } from "@/trpc/client";
import { AgentGetOne } from "../../types";
// import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { agentInsertSchema } from "../../schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface AgentsFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: AgentGetOne;
}

export const AgentsForm = ({
  onSuccess,
  onCancel,
  initialValues,
}: AgentsFormProps) => {
  const trpc = useTRPC();
//   const router = useRouter();
  const queryClient = useQueryClient();

  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions());

        if(initialValues?.id){
            await queryClient.invalidateQueries(
                trpc.agents.getOne.queryOptions({ id: initialValues.id })
            );
        }

        if (onSuccess) {
          onSuccess();
        }

      },
      onError: (error) => {
        toast.error(`Error creating agent: ${error.message}`);
      },
    })
  );

  const form = useForm<z.infer<typeof agentInsertSchema>>({
    resolver: zodResolver(agentInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      instructions: initialValues?.instructions ?? "",
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createAgent.isPending;

  const onSubmit = (values: z.infer<typeof agentInsertSchema>) => {
    if (isEdit) {
      // Handle edit logic here
      // For example, you might want to call a mutation to update the agent
      console.log("Editing agent:", values);
    } else {
      createAgent.mutate(values);
    }
  };

  return (
    <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <GeneratedAvatar
                seed={form.watch("name")}
                variant="botttsNeutral"
                classname="size-16 border"
            />
            <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Enter agent name Eg. 'Finance Bot'"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                name="instructions"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Instructions</FormLabel>
                        <FormControl>
                            <Textarea
                                {...field}
                                placeholder="You are a helpful assistant that can answer questions and provides financial advice."
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className="flex justify-between gap-x-2">
                {onCancel && (
                    <Button
                        variant="ghost"
                        onClick={() => onCancel()}
                         type="button"
                    >
                        Cancel
                    </Button>
                )}
                <Button
                    type="submit"
                    disabled={isPending}
                >   
                    {isEdit ? "Save Changes" : "Create Agent"}
                </Button>
            </div>
        </form>
    </Form>
  )

};
