import { Button } from '@components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select';
import { useLoginContext } from '@context/LoginContext';
import { useUsersContext } from '@context/UsersContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface iLoginScreen {}

const formSchema = z.object({
    newUser: z.string({ message: 'Please choose a valid user' }),
});

const LoginScreen: FC<iLoginScreen> = () => {
    const { changeUserID } = useLoginContext();
    const { users } = useUsersContext();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = useCallback((values: z.infer<typeof formSchema>) => {
        changeUserID(values.newUser);
    }, []);

    return (
        <div className={'flex min-h-screen items-center justify-center bg-gray-100'}>
            <Card className={'w-full max-w-md'}>
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">Login to UniCourse App</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="newUser"
                                render={({ field: { value, onChange, ...rest } }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <Select onValueChange={onChange} defaultValue={value} value={value} {...rest}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={'Select a user'} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {users.map(({ name, user_id }, index) => (
                                                    <SelectItem key={index} value={user_id}>
                                                        {name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>This is your public display name.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter>Created by Roman Barmak</CardFooter>
            </Card>
        </div>
    );
};

export default LoginScreen;
